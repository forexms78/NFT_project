import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import AnimalCard from "./AnimalCard";
import { web3 } from "../contracts/web3Config";

interface SaleAnimalCardProps {
  animalType: string;
  animalPrice: string;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  animalType,
  animalPrice,
}) => {
  return (
    <Box textAlign={"center"} w={150}>
      <AnimalCard animalType={animalType} />
      <Box>
        <Text d="inline_block">{web3.utils.fromWei(animalPrice)} Matic</Text>
        <Button size="sm" colorScheme="green" m={2}>
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default SaleAnimalCard;
