import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model, isValidObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(admin: AdminDocument) {
    const jwtPayload = {id: admin._id, is_creator: admin.is_creator, is_active: admin.is_active};

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ]);

    return {access_token, refresh_token};
  }

  async create(createAdminDto: CreateAdminDto) {
    if (createAdminDto.password !== createAdminDto.confirm_password) throw new BadRequestException("Password is not Match");

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);

    /*
    const newAdmin = await new this.adminModel({
      ...createAdminDto,
      hashed_password,
    }).save();
    */

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newAdmin);

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      newAdmin._id,
      {hashed_token},
      {new: true},
    );

    return {updatedAdmin, tokens};
  }

  async findAll() {
    const admins = await this.adminModel.find();

    return admins;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    const admin = await this.adminModel.findById(id);

    if (!admin) throw new NotFoundException(`Admin #${id} not Found`);

    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    const admin = await this.adminModel.findById(id);

    if (!admin) throw new NotFoundException(`Admin #${id} not Found`);

    const matchPassword = await bcrypt.compare(updateAdminDto.password, admin.hashed_password);

    if (!matchPassword) throw new UnauthorizedException("Wrong Password");

    let updatedAdmin;

    if (updateAdminDto.new_password) {
      const hashed_password = await bcrypt.hash(updateAdminDto.new_password, 7);

      updatedAdmin = await this.adminModel.findByIdAndUpdate(
        id,
        {...updateAdminDto, hashed_password},
        {new: true}
      );
    }

    updatedAdmin = await this.adminModel.findByIdAndUpdate(id, updateAdminDto, {new: true}).exec();

    return updatedAdmin;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    const admin = await this.adminModel.findById(id);

    if (!admin) throw new NotFoundException(`Admin #${id} not Found`);

    return await this.adminModel.findByIdAndDelete(id);
  }
}
