describe('글쓰기 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('input[type="text"]').type('hagi4u@gmail.com');
    cy.get('input[type="password"]').type('slsnsep1@#');
    cy.get('button[type="submit"]').click();

    cy.contains('글쓰러가기').click();
    cy.url().should('include', '/write');
  });

  it('글 작성', () => {
    cy.get('input[placeholder="제목"]').type('테스트 글 제목');
    cy.get('input#category').type('Test{enter}');
    cy.get('input#tags').type('Test{enter}');
    cy.get('textarea').type('테스트 글 내용');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/posts/');
  });

  afterEach(() => {
    cy.visit('/admin');
    cy.contains('테스트 글 삭제');
    cy.clearAllCookies();
    cy.visit('/');
  });
});
