import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Divider, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";

type Props = { activeTab: number };

export default function ProfileFollowings({ activeTab }: Props) {
  const { id } = useParams();

  const predicate = activeTab === 3 ? "followers" : "followings";

  const { profile, followings, loadingFollowings } = useProfile(id, predicate);

  return (
    <Box>
      <Box>
        <Typography variant="h5">
          {activeTab === 3
            ? `People following ${profile?.displayName}`
            : `People ${profile?.displayName} is following`}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {loadingFollowings ? (
          <Typography>Loading ...</Typography>
        ) : activeTab === 3 ? (
          profile?.followersCount === 0 ? (
            <Typography>{profile.displayName} has no followers!</Typography>
          ) : (
            <Box sx={{ display: "flex", mt: 3, gap: 3 }}>
              {followings?.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </Box>
          )
        ) : profile?.followingCount === 0 ? (
          <Typography>{profile.displayName} is following no one!</Typography>
        ) : (
          <Box sx={{ display: "flex", mt: 3, gap: 3 }}>
            {followings?.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
