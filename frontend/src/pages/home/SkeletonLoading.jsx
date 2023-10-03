import {useMemo} from 'react';

import {Skeleton, Stack} from "@mui/material";

export const SkeletonLoading = ({numStr = 14}) => {
    const rows = []

    useMemo(() => {
        for (let i = 0; i < numStr; i++) {
            rows.push(0)
        }
    }, [])


    return (
        <Stack spacing={1} sx={{overflow: 'hidden', position: 'relative'}}>
            {
                rows.map((el, i) => {
                    return (
                        <Skeleton key={i} variant="text" sx={{fontSize: '1.5rem', backgroundColor: 'rgba(255,255,255,0.06)'}}/>
                    )
                })
            }
        </Stack>
    )
}
