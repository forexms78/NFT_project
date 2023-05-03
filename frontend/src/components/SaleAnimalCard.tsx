import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";
import {
  mintAnimalTokenContract,
  saleAnimalTokenContract,
  web3,
} from "../contracts/web3Config";

interface SaleAnimalCardProps {
  animalType: string;
  animalPrice: string;
  animalTokenId: string;
  account: string;
  getOnSaleAnimalTokens: () => Promise<void>;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  animalType,
  animalPrice,
  animalTokenId,
  account,
  getOnSaleAnimalTokens,
}) => {
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getAnimalTokensOwner = async () => {
    try {
      const response = await mintAnimalTokenContract.methods
        .ownerOf(animalTokenId)
        .call();

      setIsBuyable(
        response.toLocaleLowerCase() === account.toLocaleLowerCase()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onClickBuy = async () => {
    try {
      if (!account) return;
      const response = await saleAnimalTokenContract.methods
        .purchaseAnimalToken(animalTokenId)
        .send({ from: account });

      if (response.status) {
        getOnSaleAnimalTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnimalTokensOwner();
  }, []);
  return (
    <Box textAlign={"center"} w={150}>
      <AnimalCard animalType={animalType} />
      <Box>
        <Text dir="inline_block">{web3.utils.fromWei(animalPrice)} Matic</Text>
        <Button
          size="sm"
          colorScheme="green"
          m={2}
          disabled={isBuyable}
          onClick={onClickBuy}
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default SaleAnimalCard;
