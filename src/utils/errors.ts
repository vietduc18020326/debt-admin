export const ErrorCodeMap: Record<string, string> = {
  success: "success",
  expired_access_token: "Expired access token",
  invalid_access_token: "Invalid access token",
  invalid_client_key: "invalid_client_key",
  invalid_refresh_token: "invalid_refresh_token",
  invalid_timestamp: "invalid_timestamp",
  invalid_authentic_key: "invalid_authentic_key",
  unauthorize: "unauthorize",
  no_user_found: "No user found",
  exist_user_found: "exist_user_found",
  exist_doc_found: "exist_doc_found",
  no_doc_found: "no_doc_found",
  unknown_error: "unknown_error",
  invalid_email: "invalid_email",
  no_system_found: "no_system_found",
  not_have_permission: "not_have_permission",
  not_in_system: "not_in_system",
  invalid_plan: "invalid_plan",
  no_credential_found: "no_credential_found",
  not_system_owner: "not_system_owner",
  invalid_invitation: "invalid_invitation",
  existed_system: "existed_system",
  admin_not_found: "admin_not_found",
  invalid_email_password: "invalid_email_password",
  exist_admin_found: "exist_admin_found",
  no_permission: "no_permission",
};

export function getRealErrorMessage(message: string): string {
  if (ErrorCodeMap[message]) {
    return ErrorCodeMap[message];
  }
  if (Number.isNaN(parseInt(message))) {
    return message;
  }
  return "Unknown error";
}
