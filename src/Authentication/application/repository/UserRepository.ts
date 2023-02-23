import User from '../../domain/models/User';

import BaseRepository from 'Base/repository/BaseRepository';

export default abstract class UserRepository extends BaseRepository<User> {}
