<template>
  <q-page class="container row justify-center items-center text-inter">
    <div class="loginBox row shadow-3">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 firstHalf">
        <div class="container row">
          <div class="row items-center q-pa-xl logoRow">
            <q-img src="imgs/logo.svg" style="width: 100px"></q-img>
          </div>
        </div>
      </div>
      <div
        class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 secondHalf row justify-center items-center"
      >
        <div class="container q-gutter-y-lg full-width" style="padding: 0 15%">
          <div class="q-mb-xl">
            <div class="text-h2 text-bold">Login</div>
          </div>
          <div class="row">
            <login-form class="col-12" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script src="./index.ts"></script>

<style lang="scss" src="./index.scss" scoped></style>
