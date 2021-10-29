const USER_PROPERTIES_URL = '/rest/api/3/user/properties';

interface Result<T extends any> {
  key: string;
  value: T;
}

export const getUserProperty = async <T extends any>(
  accountId: string,
  key: string,
  defaultValue?: T,
): Promise<T> => {
  const response = await fetch(
    `${USER_PROPERTIES_URL}/${key}?${new URLSearchParams({
      accountId,
    })}`,
    {
      credentials: 'same-origin',
    },
  );
  if (response.status === 404 && defaultValue !== undefined) {
    return defaultValue;
  }
  if (!response.ok) {
    throw new Error(
      `Failed to fetch user property ${key} ${response.status} ${response.statusText}`,
    );
  }
  return ((await response.json()) as Result<T>).value;
};

export const putUserProperty = async <T extends any>(
  accountId: string,
  key: string,
  value: T,
): Promise<void> => {
  const response = await fetch(
    `${USER_PROPERTIES_URL}/${key}?${new URLSearchParams({
      accountId,
    })}`,
    {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    },
  );
  if (!response.ok) {
    throw new Error(
      `Failed to set user property ${key} ${response.status} ${response.statusText}`,
    );
  }
  return;
};
