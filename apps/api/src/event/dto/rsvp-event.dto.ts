import { IsIn } from 'class-validator';

export class RsvpEventDto {
  @IsIn(['going', 'interested'])
  status: 'going' | 'interested';
}
