import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import AnimalCard from "./AnimalCard";
import { web3 } from "../contracts/web3Config";

export interface IMyAnimalCard {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
  saleStatus: boolean;
  account: string;
}

const MyAnimalCard: FC<MyAnimalCardProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
  saleStatus,
  account,
}) => {
  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType} />
      <Box mt={2}>
        {animalPrice === "0" ? (
          <div>판매 버튼</div>
        ) : (
          <Text display="inline-block">
            {web3.utils.fromWei(animalPrice)} Matic
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default MyAnimalCard;
