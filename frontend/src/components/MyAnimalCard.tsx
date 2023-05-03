import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";
import AnimalCard from "./AnimalCard";
import { saleAnimalTokenContract } from "../contracts/web3Config";
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
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      // const animalPrice = await saleAnimalTokenContract.methods
      //   .animalTokenPrices(animalTokenId)
      //   .call();

      // console.log(animalPrice);

      if (!account || !saleStatus) return;

      const saleResponse = await saleAnimalTokenContract.methods
        .setForSaleAnimalToken(
          animalTokenId,
          web3.utils.toWei(sellPrice, "ether")
        )
        .send({ from: account });

      if (saleResponse.status) {
        setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType} />
      <Box mt={2}>
        {myAnimalPrice === "0" ? (
          <>
            <InputGroup>
              <Input
                type="number"
                value={sellPrice}
                onChange={onChangeSellPrice}
              />
              <InputRightAddon children="Matic" />
            </InputGroup>
            <Button
              size={"sm"}
              colorScheme="green"
              mt={2}
              onClick={onClickSell}
            >
              sell
            </Button>
          </>
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
