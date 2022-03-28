import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  isRequired: boolean;
  placeholder: string;
  isInvalid: boolean;
}

export const PasswordInput: FC<Props> = ({
  register,
  isRequired,
  isInvalid,
  placeholder,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        test-id="password-input"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...register("password", { required: isRequired })}
        isInvalid={isInvalid}
      />
      <InputRightElement width="5.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick} test-id="show-btn">
          {show ? "Desver" : "Ver"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
