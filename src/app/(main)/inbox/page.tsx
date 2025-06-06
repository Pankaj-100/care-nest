import React from "react";

import HeroSectionProtected from "@/components/common/HeroSectionProtected";
import InboxBlock from "@/components/inbox/InboxBlock";

function page() {
  return (
    <div className="flex flex-col text-[var(--blue-gray)]">
      <HeroSectionProtected title="Inbox" />

      <InboxBlock />
    </div>
  );
}

export default page;
