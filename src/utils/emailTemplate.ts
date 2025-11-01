import { ICreateAccount, IResetPassword } from '../types/emailTemplate';

const createAccount = (values: ICreateAccount) => {
    const data = {
        to: values.email,
        subject: 'Verify your account',
        html: `
            <body 
                style="
                    font-family: Arial, sans-serif; 
                    rgb(243, 244, 246) !important; 
                    width: 100%; height: 100vh; 
                    display: flex; justify-content: center; align-items: center; 
                    color: #555; margin: 0;
                "
            >

                <div 
                    style="
                        width: 400px;
                        margin: 0 auto; padding: 40px;
                        background-color: #fff; 
                        border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    "
                >
    
                    <!-- Logo --> 
                    <img 
                        src="https://i.postimg.cc/6pgNvKhD/logo.png"
                        alt="Servi Logo" 
                        style="display: block; width:50px;" 
                    />

                    <!-- Greeting -->
                    <h2
                        style="
                            color: #000000; 
                            font-size: 24px; 
                            margin-bottom: 20px;
                        "
                    >
                        Verify your Whop Account
                    </h2>

                    <!-- Greeting -->
                    <p style="color: #555; font-weight: 600;"> Hi ${values?.name},</p>

                    <!-- Verification Instructions -->
                    <p style="color: #555; margin-bottom: 20px; line-height:24px;">
                        Use the 6-digit code below to verify your Whop <br/> account:
                    </p>
                    

                    <!-- OTP Section -->
                    <div
                        style="
                            background-color: rgb(243, 244, 246);
                            font-size: 22px; border: 1px solid #e0e0e0; 
                            padding: 16px; border-radius: 4px;
                            text-align: center; color: rgb(32, 32, 32)
                        "
                    >
                        ${values.otp}
                    </div>

                    <p
                        style="
                            color: #555; 
                            font-size: 16px; 
                            line-height: 1.5;
                            margin-bottom: 20px;
                        "
                    >
                        This code is valid for
                        <span
                            style="color: #000000; font-weight: 600;"
                        >
                            3 minutes
                        </span>.    
                    </p>

                    <!-- Footer -->
                    <p
                        style="
                            font-size: 16x;
                            line-height: 1.5rem; 
                            color: #555; 
                            margin-top: 0px;
                        "
                    >
                       If you did not request this verification, please reach out to support <span style="color: blue; ">support@gmail.com</span> for assistance.
                    
                    </p>

                </div>
            </body>
        `
    }

    return data;
}


const resetPassword = (values: IResetPassword) => {
    const data = {
        to: values.email,
        subject: 'Reset your password',
        html: `
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
                <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <img src="https://i.postimg.cc/6pgNvKhD/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
                    <div style="text-align: center;">
                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
                        <div style="background-color: #277E16; width: 120px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
                    </div>
                </div>
            </body>
        `,
    };
    return data;
};

export const emailTemplate = {
    createAccount,
    resetPassword
};