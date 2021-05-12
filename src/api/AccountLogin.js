import { SCRM_HTTP } from "@/api/APIInterceptors";

export function login(data) {
  return SCRM_HTTP.post("/api/scrm/auth/login-general", data, {
    type: "form",
  });
}
export function requestHierarchies(params) {
  return SCRM_HTTP.get("/api/scrm/institution/hierarchies", { params });
}
