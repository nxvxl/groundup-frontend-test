export const API_URL = "https://groundup-test.herokuapp.com"

export async function getAlerts() {
  return fetch(API_URL + "/api/v1/alerts/").then((res) => res.json());
}

export async function updateAlert(params: { id: string; data: any }) {
  return fetch(API_URL + "/api/v1/alerts/" +params.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params.data),
  }).then((res) => res.json());
}
