import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

export default function ShopProductCard({ asset }) {
  // const renderStatus = (
  //   <Label
  //     variant="filled"
  //     color={(asset.attributes.Ainventory === false && 'error') || 'success'}
  //     sx={{
  //       zIndex: 9,
  //       top: 16,
  //       right: 16,
  //       position: 'absolute',
  //       textTransform: 'uppercase',
  //     }}
  //   >
  //     {asset.attributes.Ainventory}
  //   </Label>
  // );

  const renderImg = (
    <Box
      component="img"
      alt={asset.attributes.Aname}
      src={"http://localhost:1337"+asset.attributes.Aimage.data.attributes.url}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  // const renderPrice = (
  //   <Typography variant="subtitle1">
  //     <Typography
  //       component="span"
  //       variant="body1"
  //       sx={{
  //         color: 'text.disabled',
  //         textDecoration: 'line-through',
  //       }}
  //     >
  //       {product.priceSale && fCurrency(product.priceSale)}
  //     </Typography>
  //     &nbsp;
  //     {fCurrency(product.price)}
  //   </Typography>
  // );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {product.status && renderStatus} */}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {asset.attributes.Aname}
        </Link>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview  />
          {renderPrice}
        </Stack> */}
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
