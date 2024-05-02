describe('홈페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('사이드바', () => {
    cy.get('[data-cy="sidebarToggle"').click();
    cy.contains('홈');
    cy.contains('태그');

    cy.get('[data-cy="instagram"').should(
      'have.attr',
      'href',
      'https://instagram.com',
    );
    cy.get('[data-cy="github"').should(
      'have.attr',
      'href',
      'https://github.com',
    );
  });

  it('글 목록', () => {
    cy.get('a[href*="/posts/"]').first().click();
    cy.url().should('include', '/posts/');
  });

  it('푸터', () => {
    cy.contains('ABOUT ME');
    cy.contains('프론트엔드 엔지니어 정명학');
    cy.get('[data-cy="admin"]').click();
    cy.url().should('include', '/admin');
    cy.get('[data-cy="write"]').click();
    cy.url().should('not.be.a', '/write');
  });
});
