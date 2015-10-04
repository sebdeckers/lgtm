export default ({ payload: { action, number, pull_request } }) => {
  if (action !== 'opened') return
  console.log(`Pull request ${ number } ${ action } by ${ pull_request.user.login }`)
}
