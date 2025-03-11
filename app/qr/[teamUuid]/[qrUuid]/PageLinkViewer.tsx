"use client";

import { defaultPageLinkOptions, PageLinkOptions } from "@/lib/linkPage";
import BackgroundArea from "../../create/link/components/BackgroundArea";
import CoverArea from "../../create/link/components/CoverArea";
import AvatarArea from "../../create/link/components/AvatarArea";
import LinksArea from "../../create/link/components/LinksArea";
import BioArea from "../../create/link/components/BioArea";
import { useCallback, useEffect, useState } from "react";
import useLinkPageOptions from "@/store/useLinkPageOptions";
import { getLinkPagesByQrId, getQrCodeById } from "@/lib/db/qrQueries";
import { Link, qrCodes } from "@/lib/db/schema";

const PageLinkViewer = ({ pageLinkData }: { pageLinkData: Link }) => {
  const {
    store: linkPageOptions,
    ui: { selectedArea },
    actions: { setStore: setLinkPageOptions, addLink, updateLink, removeLink },
  } = useLinkPageOptions();
  const setLinkPageInState = useCallback(async () => {
    setLinkPageOptions({
      background: {
        color: pageLinkData.styling?.background,
      },
      coverArea: pageLinkData.styling?.coverArea,
      avatar: pageLinkData.styling?.avatarArea,
      links: {
        theme: pageLinkData.styling?.linksArea,
        data: pageLinkData.links,
      },
      bio: {
        title: pageLinkData.pageName ?? undefined,
        description: pageLinkData.description ?? undefined,
      },
    });
  }, [pageLinkData]);

  useEffect(() => {
    console.log("useEffect");
    setLinkPageInState();
  }, [setLinkPageInState]);

  if (!pageLinkData) {
    return <div>not found</div>;
  }

  if (
    linkPageOptions.background.color.from ===
      defaultPageLinkOptions.background.color.from &&
    linkPageOptions.bio.title === defaultPageLinkOptions.bio.title
  ) {
    return <div>loading...</div>;
  }
  return (
    <BackgroundArea>
      <CoverArea>
        <AvatarArea />
      </CoverArea>
      <BioArea />
      <LinksArea />
    </BackgroundArea>
  );
};

export default PageLinkViewer;
