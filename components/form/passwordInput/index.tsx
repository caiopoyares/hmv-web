import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { FC } from "react";

interface Props {
  register: any;
  isRequired: boolean;
  placeholder: string;
}

export const PasswordInput: FC<Props> = ({
  register,
  isRequired,
  placeholder,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...register("password", { required: isRequired })}
      />
      <InputRightElement width="5.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Desver" : "Ver"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
