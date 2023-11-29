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

import classes from './error.module.css';

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
      <div className={classes.root}>
	  <Container>
	    <div className={classes.label}>404</div>

	    <Title className={classes.title}>
	      {translate(
		  "pages.error.404",
		  "Sorry, the page you visited does not exist.",
	      )}
	    </Title>

	    {errorMessage && (
	      <Text size="lg" ta="center" className={classes.description}>
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

