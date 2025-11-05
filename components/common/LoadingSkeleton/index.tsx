import { Box, Skeleton, Card, CardContent, Grid } from '@mui/material';
import { TableSkeletonRow, ListItemRow, ListItemText } from './styles';

export function CardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="40%" />
      </CardContent>
    </Card>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Box>
      {Array.from({ length: rows }).map((_, i) => (
        <TableSkeletonRow key={i}>
          <Skeleton variant="rectangular" height={60} />
        </TableSkeletonRow>
      ))}
    </Box>
  );
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <Box>
      {Array.from({ length: items }).map((_, i) => (
        <ListItemRow key={i}>
          <Skeleton variant="circular" width={40} height={40} />
          <ListItemText>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="80%" />
          </ListItemText>
        </ListItemRow>
      ))}
    </Box>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <CardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
