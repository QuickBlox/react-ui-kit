export interface UserEntity {
  id: number;
  full_name: string;
  email: string;
  login: string;
  // phone: string;
  // website: string;
  created_at: string;
  updated_at: string;
  last_request_at: string;
  // external_user_id: null;
  // facebook_id: string | null;
  blob_id: string | null;
  custom_data: string | null;
  // age_over16: boolean;
  // allow_statistics_analysis: boolean;
  // allow_sales_activities: boolean;
  // parents_contacts: string;
  user_tags: string | null;
  // password?: string;
  // old_password?: string;
}
