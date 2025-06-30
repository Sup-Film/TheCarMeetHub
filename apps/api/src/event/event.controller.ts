import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { RsvpEventDto } from './dto/rsvp-event.dto';

@Controller('events')
export class EventController {
  // GET /events - public event list
  @Public()
  @Get()
  getAllEvents() {
    // return eventService.getAllEvents();
    return [];
  }

  // GET /events/:id - public event detail
  @Public()
  @Get(':id')
  getEventById(@Param('id') id: string) {
    // return eventService.getEventById(id);
    return {};
  }

  // POST /events - organizer only
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('organizer')
  @Post()
  createEvent(@Request() req: { user: any }, @Body() body: CreateEventDto) {
    // return eventService.createEvent(req.user, body);
    return { message: 'Event created' };
  }

  // PATCH /events/:id - organizer only
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('organizer')
  @Patch(':id')
  updateEvent(@Request() req: { user: any }, @Param('id') id: string, @Body() body: CreateEventDto) {
    // return eventService.updateEvent(req.user, id, body);
    return { message: 'Event updated' };
  }

  // POST /events/:id/rsvp - attendee/organizer
  @UseGuards(JwtAuthGuard)
  @Post(':id/rsvp')
  rsvpEvent(@Request() req: { user: any }, @Param('id') id: string, @Body() body: RsvpEventDto) {
    // return eventService.rsvpEvent(req.user, id, body.status);
    return { message: 'RSVP success' };
  }
}
