import React, { Fragment } from 'react';
import storehooks from '../common/storeHooks';
import OurLink from '../common/OurLink';

type searchResultType = {};
const SearchResults: React.FC<searchResultType> = (props) => {
  const { postResults, query } = storehooks();

  return (
    <>
      {postResults.map((item, index) => (
        <div
          key={index}
          style={{
            width: '30%', padding: '10px', position: 'absolute', marginTop: '20px', backgroundColor: '#fff', border: '1px solid #000',
          }}
        >
          <img style={{ padding: '0px 8px' }} width="10px" height="10px" src={item.author.gravatar} />
          <OurLink
            style={{ fontSize: '12px' }}
            to={{
              pathname: `/post/${item.id}`,
            }}
            title={item.title}
          />
        </div>
      ))}
      {query !== '' && postResults.length === 0 && (
        <div style={{
          fontSize: '12px', width: '30%', padding: '10px', position: 'absolute', marginTop: '20px', backgroundColor: '#fff', border: '1px solid #000',
        }}
        >
          No Posts Found
        </div>
      )}
    </>
  );
};

export default SearchResults;
