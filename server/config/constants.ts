export const constants = Object.freeze({
    userRole: {
        admin: 'admin',
        user: 'user'
    },
    error: {
        auth: {
            emailTaken: 'Email has already been taken',
            itemTaken: 'Item has already been added',
            phoneNumberTaken: 'Number has already been taken',
            codeMismatch: 'Verification code mismatch',
            invalidToken: 'Invalid Token',
            invalidCredentials: 'Invalid user credentials',
            invalidUser: 'Invalid user',
            userNotFound: "We're sorry. This email address is not in our system.",
            userNotFoundForAdmin: "User not found",
            userNotVerified: 'User not verified',
            userProfileNotFound: 'User profile not found',
            deckNotFound: 'Deck not Found',
            unauthorized: 'Unauthorized',
            noAuthToken: 'No auth token',
            profileNotFound: 'Profile not found',
            invalidAuthToken: 'Invalid auth token',
            deckServiceCheck: 'All ready service exist',
            passwordNotMatch: 'Confirm password does not match.',
            passwordWrong: 'Current password is wrong.',
            invalidPasswordToken: 'Invalid password token',
            invalidEmailToken: 'Invalid email token',
            emailNotVerified: 'Email not verified',
            postNotfound: 'Post not found',
            artistNotfound: 'Artist not found',
            postConfig: 'Post config wrong',
            accessDenied: 'Access Denied',
            userNotSame: 'Cannot signup with this user. Please check user id',
            emailNotInSystem :'We’re sorry. This email address is not in our system',
            cannotDeleteSubscribedUser : 'Cannot delete user as the user has a subscription',
            cannotDeleteAdminUser: "Cannot delete an admin",

        },
        config: {
            allConfigsNotFound: 'One or more categories not found',
            categoryNotFound: 'Category is invalid',
            levelNotFound: 'Level is invalid',
            typeNotFound: 'Type is invalid'
        },
        stripe: {
            plans: 'Error fetching plans from stripe',
            customer: 'Error fetching customer from stripe',
            notCustomer: 'This user does not have any stripe details',
            chargesError: 'Cannot fetch charges error',
            percentOffInvalid : 'Percent off cannot be more than 100%',
            amountOffInvalid : 'Amount off cannot be more than yearly subscription rate',
            couponAlreadyExists:'Coupon with same name already exists'
        },
        subscription: {
            noSubscription: 'You do not have any subscriptions',
            androidSubsFailed: 'Updating subscription failed. Please try again!',
            couponNotFound: "Invalid coupon",
            couponUsed:  "This coupon is not available",
            couponUserByUser: "This coupon has already been used by the user",
            couponOnlyApplicableForYearly: "This coupon is only applicable for yearly",
            couponOnlyApplicableForMonthly: "This coupon is only applicable for monthly",
            couponExpired : "This coupon has expired",
            couponNotActive: "Coupon is not active"
        }
    },

    activeStatus: {
        active: 'active',
        inactive: 'inactive',
        deleted: 'deleted'
    },

    duration: {
        lessThan15: "Less than 15 mins",
        '15to30': "15 - 30 mins",
        greaterThan30: "30 - 60 mins",
        greaterThan60: "Greater than 60 mins"
    },
    durationRank: {
        lessThan15: 1,
        '15to30': 2,
        greaterThan30: 3
    },
    subscriptionPlatform: {
        ios: 'ios', android: 'android', stripe: 'stripe', admin: 'admin'
    },
    subscriptionStatus : {
        activeTrial : 'active_trial',
        activePaid:  'active_paid', 
        inactive: 'inactive'
    },
    subscriptionType : {
        monthly : 'monthly',
        yearly:  'yearly', 
        lifetime: 'lifetime'
    },
    trialDurations: {
        '1 month' : 30,
        '2 months' : 60,
        '3 months' : 90
    },
    offerType : {
        'percentOff': 'percent_off',
        'amountOff': 'amount_off'
    }
});
  