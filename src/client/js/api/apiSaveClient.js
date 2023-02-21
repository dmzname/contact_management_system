import { TOKEN } from '../../index';

export async function apiSaveClient(formData, method) {
  console.log(formData);
  const response = await fetch('/clients', {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
