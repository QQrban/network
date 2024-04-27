import { Box, Grid, Typography } from "@mui/material";
import { Item } from "../shared/Item";
import PostsSection from "../shared/PostsSection";
import CreatePost from "../shared/CreatePost";

export default function MiddleColumn() {
  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#2a2a2a" }}>
        People you may know
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid sx={{ mt: "8px" }} item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {[0, 1, 2, 3, 4].map((value) => (
              <Grid key={value} item>
                <Item
                  radius="8px"
                  sx={{
                    height: 140,
                    width: 108,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", mt: "23px" }}>
          <CreatePost />
        </Box>
        <Box sx={{ mt: "23px" }}>
          {[0, 1, 2, 3, 4].map((_, index) => (
            <PostsSection key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
