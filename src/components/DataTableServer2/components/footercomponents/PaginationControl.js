// @ts-nocheck
import React from 'react';

import {
    Pagination as ArkPagination,
    PaginationEllipsis,
    PaginationNextPageTrigger,
    PaginationPageTrigger,
    PaginationPrevPageTrigger,
  } from '@ark-ui/react';
  import {
    Button,
    Center,
    IconButton,
    List,
    ListItem,
    Text,
    VisuallyHidden,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import { useTranslation } from 'react-i18next';
  import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
  
  export const PaginationControl = (props) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { t } = useTranslation();
    return (
      <ArkPagination {...props}>
        {({ pages, page }) => (
          <List display="flex" justifyContent="space-between">
            <ListItem>
              <PaginationPrevPageTrigger asChild>
                {isMobile ? (
                  <IconButton
                    variant="secondary"
                    icon={<FiArrowLeft />}
                    aria-label="Previous Page"
                  />
                ) : (
                  <Button
                    variant="tertiary"
                    leftIcon={<FiArrowLeft />}
                    isDisabled={pages.length === 0}
                  >
                    {t('Previous')} <VisuallyHidden>{t('Page')}</VisuallyHidden>
                  </Button>
                )}
              </PaginationPrevPageTrigger>
            </ListItem>
            <List display={{ base: 'none', md: 'flex' }} gap="1">
              {pages.length > 0 ? (
                pages.map((page, index) =>
                  page.type === 'page' ? (
                    <ListItem key={index}>
                      <PaginationPageTrigger asChild {...page}>
                        <Button
                          variant="outline"
                          borderColor="gray"
                          borderRadius="full"
                          width="40px"
                          height="40px"
                          bg={page.value === props.page ? 'gray.400' : ''}
                        >
                          {page.value}
                        </Button>
                      </PaginationPageTrigger>
                    </ListItem>
                  ) : (
                    <ListItem key={index} alignItems="center" display="flex">
                      <PaginationEllipsis index={index}>
                        <Text as="span" color="fg.emphasized">
                          &#8230;
                        </Text>
                      </PaginationEllipsis>
                    </ListItem>
                  )
                )
              ) : (
                <ListItem alignItems="center" display="flex">
                  <Button
                    variant="outline"
                    borderColor="gray"
                    borderRadius="full"
                    isDisabled={true}
                  >
                    1
                  </Button>
                </ListItem>
              )}
            </List>
            <ListItem as={Center} display={{ md: 'none' }}>
              <Text fontWeight="medium" color="fg.emphasized">
                {t('Page')} {page} {t('of')} {pages.length}
              </Text>
            </ListItem>
            <ListItem>
              <PaginationNextPageTrigger asChild>
                {isMobile ? (
                  <IconButton
                    variant="secondary"
                    icon={<FiArrowRight />}
                    aria-label="Next Page"
                  />
                ) : (
                  <Button
                    variant="tertiary"
                    rightIcon={<FiArrowRight />}
                    isDisabled={pages.length === 0}
                  >
                    Next <VisuallyHidden>Page</VisuallyHidden>
                  </Button>
                )}
              </PaginationNextPageTrigger>
            </ListItem>
          </List>
        )}
      </ArkPagination>
    );
  };
  