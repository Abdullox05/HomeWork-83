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


export class CreateAdminDto {
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @MaxLength(32)
  email: string;

  @IsPhoneNumber("UZ")
  phone: string;

  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  telegram_link: string;

  @IsStrongPassword()
  @MaxLength(16)
  @MinLength(8)
  password: string;

  @IsStrongPassword()
  @MaxLength(16)
  @MinLength(8)
  confirm_password: string;
  
  @MaxLength(64)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
