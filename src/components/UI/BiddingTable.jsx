import { useState } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const BiddingTable = ({ bids = [] }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const sortedBids = [...bids].sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  const anonymiseName = (name) => {
    if (!name) return 'Anonymous';
    return name.charAt(0) + '*'.repeat(name.length - 1);
  };
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <TableContainer>
      <Table variant="striped" style={{ tableLayout: 'auto' }}>
        <Thead>
          <Tr>
            <Th textAlign="left">Bidder</Th>
            <Th textAlign="right">Bid</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedBids.length > 0 ? (
            sortedBids.slice(0, visibleCount).map((bid, index) => (
              <Tr key={bid.id || index}>
                <Td>
                  <Text>{anonymiseName(bid.bidder?.name)}</Text>
                </Td>

                <Td fontWeight="bold" textAlign="right">
                  {bid.amount} Credits
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} textAlign="center">
                No bids available
              </Td>
            </Tr>
          )}
        </Tbody>
        {visibleCount < sortedBids.length && (
          <Tfoot>
            <Tr>
              <Th colSpan={3} textAlign="center">
                <Text
                  color="gray.500"
                  cursor="pointer"
                  onClick={handleLoadMore}
                >
                  View more bids
                </Text>
              </Th>
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
};

BiddingTable.propTypes = {
  bids: PropTypes.array.isRequired,
};

export default BiddingTable;
