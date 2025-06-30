import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;

  @IsNotEmpty()
  @IsString()
  location_name: string;

  @IsNumber()
  location_lat: number;

  @IsNumber()
  location_lon: number;

  @IsOptional()
  @IsString()
  poster_image_url?: string;
}
