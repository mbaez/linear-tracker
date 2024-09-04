const Constants = {
  Transaction: "advisorly-transaction",
};

Constants.Registration = {
  Status: {
    Incomplete: "INCOMPLETE",
    Pending: "PENDING",
    Approved: "APPROVED",
    Denied: "DENIED",
  },
};

Constants.Registration.Status.List = [
  Constants.Registration.Status.Incomplete,
  Constants.Registration.Status.Pending,
  Constants.Registration.Status.Approved,
  Constants.Registration.Status.Denied,
];

Constants.User = {};

Constants.User.ProfileType = {
  Admin: "ADMIN",
  Student: "STUDENT",
  Preceptor: "PRECEPTOR",
  Coordinator: "COORDINATOR",
  EducationDepartment: "EDUCATION_DEPARTMENT",
};

Constants.User.ProfileType.List = [
  Constants.User.ProfileType.Admin,
  Constants.User.ProfileType.Student,
  Constants.User.ProfileType.Preceptor,
  Constants.User.ProfileType.Coordinator,
  Constants.User.ProfileType.EducationDepartment,
];

Constants.Mail = {
  Registration: {
    VerifyEmail: {
      subject: "Verify your identity",
      template: "templates/registration/verify-email-template.html",
    },
    EmailVerified: {
      subject: "Your application request has been submitted",
      template: "templates/registration/email-verified-template.html",
    },
    NewAccount: {
      subject: "Welcome to Advisorly - Let's get started!",
      template: "templates/registration/new-account-template.html",
    },
    DenyRegistration: {
      subject: "Your application request has been denied",
      template: "templates/registration/deny-registration-template .html",
    },
  },
};

Constants.Match = {
  Status: {
    Incomplete: "INCOMPLETE",
    Pending: "PENDING",
    Approved: "APPROVED",
    Rejected: "REJECTED",
    Denied: "DENIED",
  },
};

Constants.Match.Status.List = [
  Constants.Match.Status.Incomplete,
  Constants.Match.Status.Pending,
  Constants.Match.Status.Approved,
  Constants.Match.Status.Rejected,
  Constants.Match.Status.Denied,
];

exports.Constants = Constants;
