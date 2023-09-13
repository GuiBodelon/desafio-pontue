<template>
  <div>
    <q-form @submit="onSubmitLogin" class="q-gutter-lg col-12">
      <q-input v-model="email" dense label="Email" hint="Insira seu e-mail." type="email" lazy-rules :rules="[
        (val) =>
          (val && val.length > 0) ||
          'Por favor informe o seu e-mail',
      ]">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-input v-model="password" dense :type="isPwd ? 'password' : 'text'" label="Senha" hint="Insira sua senha."
        lazy-rules :rules="[
          (val) => (val && val.length > 0) || 'Por favor informe a sua senha',
        ]">
        <template v-slot:prepend>
          <q-icon name="key" />
        </template>
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <div class="row q-gutter-y-lg">
        <q-btn label="Login" type="submit" size="md" color="primary" class="full-width" rounded />
      </div>
      <div class="row justify-between text-bold">
        <!--<q-checkbox size="xs" v-model="rememberMe" label="Lembrar-me" />
        <router-link to="#" class="q-mt-sm"> Esqueceu a Senha? </router-link>-->
      </div>
      <div class="q-pt-xl text-center text-primary text-overline">
        © 2022 - Todos direitos reservados
      </div>
    </q-form>
  </div>
</template>
<script src="./index.ts"></script>
<style lang="scss">
.customHR {
  color: $text-primary;
  border-bottom: 1px solid $text-primary;
  width: 100%;
  height: 20px;
  text-align: center;
}

.customHRText {
  position: relative;
  bottom: -6px;
  font-size: 12px;
  padding: 0 10px;
}

a {
  color: $primary;
  text-decoration: none;
}
</style>
