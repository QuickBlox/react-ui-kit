export interface UserEntity {
  id: number;
  full_name: string;
  email: string;
  login: string;
  created_at: string;
  updated_at: string;
  last_request_at: number;
  blob_id: string | null;
  photo: string | null;
  custom_data: string | null;
  user_tags: string | null;
}
