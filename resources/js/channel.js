



Echo.join(`online-status`)
.listen('UserStatusEvent', (e) => {
    console.log(e);
})
.here(users => {
    console.log('Users currently online:', users);
})
.error((error) => {
    console.log(error);
});
