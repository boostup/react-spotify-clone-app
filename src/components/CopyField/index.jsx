import { InputAdornment, styled, TextField, Tooltip } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "@material-ui/icons/FileCopy";

const CopyError = {
  NotAvailable: "NotAvailable",
  WriteError: "WriteError",
};

const IconButtonWithTooltip = styled(IconButton)({
  root: {
    "&.Mui-disabled": {
      pointerEvents: "auto",
    },
  },
});
const AlignedInputAdornment = styled(InputAdornment)({
  margin: "0 auto", // fix for vertically unaligned icon
});

export function CopyField({
  onCopyError,
  onCopySuccess,
  copyTooltip = "Copy",
  value,
  showTextField = true,
  ...rest
}) {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const enabled = "clipboard" in navigator;
    setDisabled(!enabled);

    if (!enabled) {
      typeof onCopyError == "function" && onCopyError(CopyError.NotAvailable);
    }
  }, [onCopyError]);

  const copyText = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(value).then(
        () => {
          typeof onCopySuccess == "function" && onCopySuccess(value);
        },
        () => {
          typeof onCopyError == "function" && onCopyError(CopyError.WriteError);
        }
      );
    } else {
      typeof onCopyError == "function" && onCopyError(CopyError.NotAvailable);
    }
  };

  function CopyButtonEnabled({ role = "" }) {
    return (
      <Tooltip title={copyTooltip}>
        <div>
          {/**
           * for some reason, if I remove this DIV, the tooltip no longer triggers...took me hours to have this tooltip to work, and until this DIV was missing, this refactor did not work.
           * i guess this could be related: https://v4.mui.com/api/tooltip/#props > `Props` table > `children` row => it says: "Tooltip reference element. ⚠️ Needs to be able to hold a ref."
           */}
          <CopyButton />
        </div>
      </Tooltip>
    );
  }

  function CopyButton({ role = "" }) {
    return (
      <IconButtonWithTooltip
        role={role ? "button" : ""}
        disabled={disabled}
        onClick={copyText}
      >
        <CopyIcon />
      </IconButtonWithTooltip>
    );
  }

  return (
    <>
      {showTextField && (
        <TextField
          type="text"
          value={value}
          InputProps={{
            endAdornment: (
              <AlignedInputAdornment position="end">
                {disabled ? <CopyButton /> : <CopyButtonEnabled role />}
              </AlignedInputAdornment>
            ),
          }}
          {...rest}
        />
      )}
      {!showTextField && <CopyButtonEnabled role />}
    </>
  );
}

export function DefaultCopyField(props) {
  const [tooltip, setTooltip] = useState("Copy");
  const setCopied = () => setTooltip("Copied!");
  const setCopyError = () => setTooltip("Copy Error!");
  return (
    <CopyField
      copyTooltip={tooltip}
      onCopySuccess={setCopied}
      onCopyError={setCopyError}
      {...props}
    />
  );
}
