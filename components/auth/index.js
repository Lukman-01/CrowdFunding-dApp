const {
  Wrapper,
  AuthTitle,
  TitleContainer,
  Container,
  InputField,
} = require("./styles");

function Auth({ children, ...props }) {
  return (
    <Wrapper {...props}>
      <Container className="w-1/2 rounded-[15px] shadow-lg shadow-black/5">
        {children}
      </Container>
    </Wrapper>
  );
}

Auth.TitleContainer = function AuthTitleContainer({ children, ...props }) {
  return <TitleContainer {...props}>{children}</TitleContainer>;
};

Auth.Header = function AuthHeader({ children, ...props }) {
  return <AuthTitle {...props}>{children}</AuthTitle>;
};

Auth.Input = function AuthInput({ ...props }) {
  return <InputField {...props} />;
};

export default Auth;
