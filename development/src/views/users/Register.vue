<template>
  <div style="min-height: 80vh;">
    <comp-header
      :background-image="require('../../assets/images/topbanneredit.png')"
      background-colour="#5B7D87"
      title="Register"
    />
    <v-stepper v-model="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="stepper > 1" step="1"
          >Account Details</v-stepper-step
        >
        <v-divider />
        <v-stepper-step :complete="stepper > 2" step="2"
          >Verify Email</v-stepper-step
        >
        <v-divider />
        <v-stepper-step :complete="stepper > 3" step="3"
          >Payment Information</v-stepper-step
        >
        <v-divider />
        <v-stepper-step step="4">Upload Files</v-stepper-step>
      </v-stepper-header>
      <slide-up-down :active="alert.show">
        <div class="registration-message-centre">
          <v-alert
            :color="alert.type"
            dark
            :icon="alert.icon"
            border="left"
            prominent
          >
            {{ alert.message }}
          </v-alert>
        </div>
      </slide-up-down>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form>
            <v-container>
              <v-row justify="center">
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="name.first"
                    :rules="[name.rules.required]"
                    label="First name"
                    prepend-icon="mdi-account"
                    clearable
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="name.last"
                    :rules="[name.rules.required]"
                    label="Last name"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="email.value"
                    label="Email"
                    :rules="[email.rules.validate]"
                    prepend-icon="mdi-at"
                    clearable
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="password.value1"
                    label="Password"
                    :append-icon="password.show1 ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="password.show1 ? 'text' : 'password'"
                    @click:append="password.show1 = !password.show1"
                    hint="At least 8 characters"
                    counter
                    :rules="[password.rules.required, password.rules.min]"
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="password.value2"
                    label="Confirm password"
                    :append-icon="password.show2 ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="password.show2 ? 'text' : 'password'"
                    @click:append="password.show2 = !password.show2"
                    counter
                    :rules="[
                      password.rules.required,
                      password.rules.min,
                      password.rules.match
                    ]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center"
                  >You will be prompted to verify your email address in the next
                  step.</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="6" class="text-center" offset="6">
                  <v-btn
                    :loading="loading.create"
                    :disabled="loading.create"
                    color="primary"
                    @click="createAccount"
                  >
                    Create Account
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-container>
            <v-row>
              <v-col cols="12" md="12" class="text-center">
                <p>Enter your code and click to verify {{ email.value }}:</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" class="mx-auto">
                <v-text-field
                  v-model="email.verify"
                  label="Verify Email"
                  placeholder="Enter your email verification code here"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="text-center">
                <v-btn v-if="entry < 2" color="error" @click="stepper--">
                  Back
                </v-btn>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-btn
                  :loading="loading.verify"
                  :disabled="loading.verify"
                  color="primary"
                  @click="verifyEmail"
                >
                  Verify
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-container>
            <v-row>
              <v-col>
                <v-card flat>
                  <div class="glacial text-center">
                    Your payment information is processed and saved solely by
                    Stripe. No payment information is sent to, or saved by Ren &
                    Rain Marketing.
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="6" class="mb-4">
                <comp-stripe-card class="stripe-card" :email="email.value" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="text-center">
                <v-btn v-if="entry < 3" color="error" @click="stepper--">
                  Back
                </v-btn>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-btn color="primary" @click="stepper++">
                  Next
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-container>
            <v-row>
              <v-col cols="6" class="text-center">
                <v-btn color="error" @click="stepper--">
                  Back
                </v-btn>
              </v-col>
              <v-col cols="6" class="text-center">
                <v-btn color="primary" @click="submitForm">
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import CompStripeCard from "../../components/StripeCard.vue";

export default {
  data() {
    return {
      loading: {
        create: false,
        verify: false,
        upload: false
      },
      entry: 0,
      stepper: 1,
      complete: false,
      password: {
        value1: "",
        value2: "",
        show1: false,
        show2: false,
        rules: {
          required: v => !!v || "Required",
          min: v => v.length >= 8 || "Min 8 characters",
          oneUppercase: v =>
            /[A-Z]/.test(v) || "At least one uppercase character",
          oneNumber: v => /\d/.test(v) || "At least one number",
          match: () =>
            this.password.value1 === this.password.value2 ||
            "Passwords must match"
        }
      },
      name: {
        first: "",
        last: "",
        rules: {
          required: v => !!v || "Required"
        }
      },
      email: {
        value: "floodlitworld@gmail.com",
        verify: "",
        rules: {
          validate: v => this.validateEmail(v) || "Not a valid email"
        }
      },
      card: {
        loading: false
      },
      alert: {
        show: true,
        type: "primary",
        message: "This is a test.",
        icon: "mdi-vuetify"
      }
    };
  },
  methods: {
    createAccount() {
      this.loading.create = true;

      const body = {
        email: this.email.value,
        first_name: this.name.first,
        last_name: this.name.last,
        password: this.password.value1,
        password_confirm: this.password.value2
      };

      this.$api({
        url: "/api/user/create",
        body
      })
        .then(json => {
          if (json.event === "account_creation_succeeded" && json.token) {
            this.$store.commit("setJWT", json.token);
            this.stepper = 2;
          } else {
            // Do the error thing
            console.log(json);
            console.log(status);
          }
        })
        .finally(() => {
          this.loading.create = false;
        });
    },
    verifyEmail() {
      this.loading.verify = true;
      fetch("/api/user/verify-email", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email.value,
          email_verification_code: this.email.verify
        })
      })
        .then(async result => {
          const json = await result.json();
          if (result.status !== 200) throw new Error(json.message);
          return json;
        })
        .then(json => {
          if (json.event === "email_already_verified") {
            this.stepper = 3;
            this.alert.type = "warning";
            this.alert.message = json.message;
          } else {
            this.alert.type = "success";
            this.alert.message = json.message;
          }
        })
        .catch(err => {
          console.log(err);
          this.alert.type = "error";
          this.alert.message = err;
        })
        .finally(() => {
          this.loading.verify = false;
          this.alert.show = true;
          setTimeout(() => {
            this.alert.show = false;
          }, 5000);
        });
    },
    validateEmail(email) {
      return /\w+@\w+\.\w{2,}/.test(email);
    },
    submitForm() {
      // Do the thing
    },
    enterVerify() {
      this.stepper = this.entry = 2;
      this.email.value = this.$route.params.email;
      this.email.verify = this.$route.params.hash;
    }
  },
  components: {
    CompStripeCard
  },
  created() {
    const step = this.$route.params.step;
    switch (step) {
      case "verify":
        this.enterVerify();
        break;
    }
  }
};
</script>

<style scoped>
.registration-message-centre {
  text-align: center;
  padding: 1em;
}
</style>
