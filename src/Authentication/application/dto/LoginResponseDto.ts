import User from 'Authentication/domain/models/User';

export default interface LoginResponseDto {
  user: User;
  accessToken: string;
}
