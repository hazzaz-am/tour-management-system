/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import passport from "passport";
import {
	Strategy as GoogleStrategy,
	Profile,
	VerifyCallback,
} from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";

// Credentials Authentication
passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email: string, password: string, done) => {
			try {
				const user = await User.findOne({ email });

				if (!user) {
					return done(null, false, {
						message: "User not found",
					});
				}

				const isGoogleAuthenticated = user.auths.some(
					(auth) => auth.provider === "google"
				);

				if (isGoogleAuthenticated && !user.password) {
					return done(null, false, {
						message:
							"This account is authenticated with Google. Please login using Google. If you want to use this email than please login with Google first and set a password.",
					});
				}

				const isPassMatch = await bcryptjs.compare(
					password,
					user.password as string
				);

				if (!isPassMatch) {
					return done(null, false, {
						message: "Password doesn't match",
					});
				}

				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

// Google Authentication
passport.use(
	new GoogleStrategy(
		{
			clientID: envVars.GOOGLE_CLIENT_ID,
			clientSecret: envVars.GOOGLE_CLIENT_SECRET,
			callbackURL: envVars.GOOGLE_CALLBACK_URL,
		},
		async (
			_accessToken: string,
			_refreshToken: string,
			profile: Profile,
			done: VerifyCallback
		) => {
			try {
				const email = profile.emails?.[0].value;

				if (!email) {
					return done(null, false, {
						message: "Email not found",
					});
				}

				let user = await User.findOne({ email });

				if (!user) {
					user = await User.create({
						email,
						name: profile.displayName,
						picture: profile.photos?.[0].value,
						role: Role.USER,
						isVerified: true,
						auths: [
							{
								provider: "google",
								providerId: profile.id,
							},
						],
					});
				}

				return done(null, user);
			} catch (error) {
				console.log("Google Strategy error", error);
				return done(error);
			}
		}
	)
);

passport.serializeUser((user: any, done: any) => {
	done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});
