import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '',
    access_token: '',
    token_type: '',
    expires_at: '',
  });

  // Carregar dados persistentes do localStorage quando a loja é criada
  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user') || '');
  }

  const changeAccessToken = (newAccessToken: string) => {
    user.value.access_token = newAccessToken;
    // Salvar dados persistentes no localStorage
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const changeTokenType = (newTokenType: string) => {
    user.value.token_type = newTokenType;
    // Salvar dados persistentes no localStorage
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const changeExpiresAt = (newExpiresAt: string) => {
    user.value.expires_at = newExpiresAt;
    // Salvar dados persistentes no localStorage
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const clearStore = () => {
    user.value.id = '';
    user.value.access_token = '';
    // Remover dados persistentes do localStorage
    localStorage.removeItem('user');
  };

  const updateWholeStore = (
    newId: string,
    newAccessToken: string,
    newTokenType: string,
    newExpiresAt: string
  ) => {
    user.value.id = newId;
    user.value.access_token = newAccessToken;
    user.value.token_type = newTokenType;
    user.value.expires_at = newExpiresAt;
    // Salvar dados persistentes no localStorage
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  return {
    user,
    changeAccessToken,
    changeTokenType,
    changeExpiresAt,
    clearStore,
    updateWholeStore,
  };
});
