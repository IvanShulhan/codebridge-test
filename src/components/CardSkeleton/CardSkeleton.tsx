import { Skeleton, Box } from '@mui/material';

export const CardSkeleton = () => (
  <Box 
    sx={{ border: '1px solid #eee', borderRadius: '5px' }}
  >
    <Skeleton
      variant="rectangular"
      height={217}
    />
    <Box sx={{ p: '25px' }}>
      <Skeleton width="70%" sx={{ mb: '5px' }}/>
      <Skeleton height={50} sx={{ mb: '-10px' }}/>
      <Skeleton height={80} sx={{ mb: '15px' }}/>
      <Skeleton width="40%" />
    </Box>
  </Box>
)