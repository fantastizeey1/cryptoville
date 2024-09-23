import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from "../services/crypptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching, error } = useGetExchangesQuery();

  // Check if the API response contains the error message
  const errorMessage = data?.message || error?.data?.message;

  // If data exists and it's not an error, extract exchangesList
  const exchangesList = data?.data?.exchanges || [];

  if (isFetching) return <Loader />;

  // If there's an error message, display it
  if (errorMessage) {
    return (
      <Row>
        <Col span={24}>
          <Text>{errorMessage}</Text>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.length > 0 ? (
          exchangesList.map((exchange) => (
            <Col span={24} key={exchange.id}>
              <Collapse>
                <Panel
                  showArrow={false}
                  header={
                    <Row>
                      <Col span={6}>
                        <Text>
                          <strong>{exchange.rank}.</strong>
                        </Text>
                        <Avatar
                          className="exchange-image"
                          src={exchange.iconUrl}
                        />
                        <Text>
                          <strong>{exchange.name}</strong>
                        </Text>
                      </Col>
                      <Col span={6}>${millify(exchange.volume)}</Col>
                      <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                      <Col span={6}>{millify(exchange.marketShare)}%</Col>
                    </Row>
                  }
                >
                  {HTMLReactParser(exchange.description || "")}
                </Panel>
              </Collapse>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Text>No exchanges available</Text>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Exchanges;
