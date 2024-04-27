import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { Item } from "../shared/Item";
import PostsSection from "../shared/PostsSection";
import CreatePost from "../shared/CreatePost";
import { StyledBadge } from "../shared/StyledBadge";

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
            {[0, 1, 2, 3].map((value) => (
              <Grid key={value} item>
                <Item
                  radius="8px"
                  sx={{
                    height: 160,
                    width: 140,
                    p: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <Box>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 48, height: 48 }}
                      />
                    </StyledBadge>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      Harry Houdini
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "#00000057",
                      }}
                    >
                      escape artist, illusionist
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      width: "70px",
                      height: "30px",
                      textTransform: "capitalize",
                    }}
                    variant="contained"
                  >
                    Follow
                  </Button>
                </Item>
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
