module.exports = (args) => {
    console.log('complete callback example');
    console.log('Not built themes (with errors): ', args && args.length ? JSON.stringify(args[0]) : '');
    console.log('Success built themes: ', args && args.length > 1 ? JSON.stringify(args[1]) : '');
};