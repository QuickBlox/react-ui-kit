import { UserEntity } from '../../../../../Domain/entity/UserEntity';
export default class InviteUsersResultViewModel {
    users: UserEntity[];
    status: boolean[];
    constructor(users?: UserEntity[], status?: boolean[]);
}
