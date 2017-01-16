export const REQUEST_SUBMISSIONS = 'REQUEST_SUBMISSIONS';
export const FETCHED_SUBMISSIONS = 'FETCHED_SUBMISSIONS';
export const REQUEST_AUTHENTICATION_CREDENTIALS = 'REQUEST_AUTHENTICATION_CREDENTIALS';
export const RECEIVE_AUTH_TOKEN = 'RECEIVE_AUTH_TOKEN';
export const NOTIFY_ABOUT_SUBMISSION = 'NOTIFY_ABOUT_SUBMISSION';

export function notifyAboutSubmission(submission, onClick) {
  const notification = new Notification(`New Submission from ${submission.student.name}`, {
    body: `
      Assignment: ${submission.assignment.title}\r
      Notes: ${submission.notes}
    `
  });
  notification.onclick = onClick;

  return {
    type: NOTIFY_ABOUT_SUBMISSION,
    submission
  };
}


export function requestAuthenticateCredentials(credentials) {
  return {
    type: REQUEST_AUTHENTICATION_CREDENTIALS,
    email: credentials.email,
    password: credentials.password
  };
}

export function receiveAuthToken(authToken) {
  return {
    type: RECEIVE_AUTH_TOKEN,
    authToken: authToken
  };
}


export function requestSubmissions() {
  return {
    type: REQUEST_SUBMISSIONS
  };
}

export function fetchedSubmissions(submissions) {
  return {
    type: FETCHED_SUBMISSIONS,
    submissions: submissions
  };
}
