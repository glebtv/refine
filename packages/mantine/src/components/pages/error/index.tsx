import React, { useEffect, useState } from "react";
import { RefineErrorPageProps } from "@refinedev/ui-types";
import {
    useNavigation,
    useTranslate,
    useGo,
    useResource,
    useRouterType,
} from "@refinedev/core";
import {
    Title,
    Text,
    Group,
    Container,
    Button,
} from "@mantine/core";

export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const translate = useTranslate();
    const { push } = useNavigation();
    const go = useGo();
    const routerType = useRouterType();

    const { resource, action } = useResource();

    useEffect(() => {
        if (resource && action) {
            setErrorMessage(
                translate(
                    "pages.error.info",
                    {
                        action,
                        resource: resource?.name,
                    },
                    `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`,
                ),
            );
        }
    }, [resource, action]);

    return (
      <div style={{
          paddingTop: "rem(20px)",
          paddingBottom: "rem(40px)",
          backgroundColor: "var(--mantine-color-blue-filled)"
      }}>
	  <Container>
	    <div style={{
            textAlign: "center",
            fontWeight: "900",
            fontSize: "rem(220px)",
            lineHeight: "1",
            marginBottom: "var(--mantine-spacing-xl)","color":"var(--mantine-color-blue-3)"
        }}>404</div>
        <Title style={{
            fontFamily: "var(--mantine-font-family)",
            textAlign: "center",
            fontWeight: "900",
            fontSize: "rem(38px)",
            color: "var(--mantine-color-white)"
        }}>
	      {translate(
		  "pages.error.404",
		  "Sorry, the page you visited does not exist.",
	      )}
	    </Title>

	    {errorMessage && (
	      <Text size="lg" ta="center" style={{
            maxWidth: "rem(540px)",
            margin: "auto",
            marginTop: "var(--mantine-spacing-xl)",
            marginBottom: "calc(var(--mantine-spacing-xl) * 1.5)",
            color :"var(--mantine-color-blue-1)"
          }}>
            {errorMessage}
	      </Text>
	    )}

	    <Group justify="center">
	      <Button
		variant="white"
		size="md"
                onClick={() => {
                    if (routerType === "legacy") {
                        push("/");
                    } else {
                        go({ to: "/" });
                    }
                }}
	      >
                {translate("pages.error.backHome", "Back Home")}
	      </Button>
	    </Group>
	  </Container>
	</div>
    );
};

