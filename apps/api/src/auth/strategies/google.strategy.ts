import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

interface GoogleProfile {
  id: string;
  emails: Array<{ value: string }>;
  photos: Array<{ value: string }>;
  name: { givenName: string; familyName: string };
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const googleClientId = configService.get<string>('GOOGLE_CLIENT_ID');
    const googleClientSecret = configService.get<string>(
      'GOOGLE_CLIENT_SECRET',
    );

    if (!googleClientId || !googleClientSecret) {
      throw new Error(
        'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be defined in the configuration',
      );
    }

    console.log('Google Client ID:', googleClientId);
    console.log('Google Client Secret:', googleClientSecret);

    super({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: 'http://localhost:8000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, photos } = profile;
    const { givenName, familyName } = profile.name;

    console.log('🔍 Full profile object:', JSON.stringify(profile, null, 2)); // ดู structure จริง

    const user = {
      googleId: id,
      email: emails[0].value,
      name: `${givenName} ${familyName}`,
      image: photos[0].value,
    };
    done(null, user);
  }
}
