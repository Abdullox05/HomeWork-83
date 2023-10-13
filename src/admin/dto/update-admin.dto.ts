import {
  MinLength,
  MaxLength,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsOptional
} from "class-validator";

export class UpdateAdminDto {
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  full_name?: string;

  @IsEmail()
  @MaxLength(32)
  @IsOptional()
  email?: string;

  @IsPhoneNumber("UZ")
  @IsOptional()
  phone?: string;

  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  telegram_link?: string;

  @IsStrongPassword()
  @MaxLength(16)
  @MinLength(8)
  password: string;
  
  @IsStrongPassword()
  @MaxLength(16)
  @MinLength(8)
  @IsOptional()
  new_password?: string;
  
  @MaxLength(64)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
