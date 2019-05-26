function createUser(root, args, context) {
    console.log('Args', args)
    let data = {
      
            userName: args.userName,
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            phoneNumber: args.phoneNumber,
            password: args.password,
            balance: 0.0,
            userVerified: false,
        
    }
    let user = context.prisma.createUser(
        data
    );

    console.log('User', user);
    return user;
}

module.exports = {
    createUser,
}

/* id?: Maybe<ID_Input>;
firstName: String;
lastName: String;
userName: String;
password: String;
email: String;
phoneNumber?: Maybe<String>;
balance: Float;
userVerified: Boolean;
ledgerEntries?: Maybe<LedgerCreateManyWithoutUserInput>; */